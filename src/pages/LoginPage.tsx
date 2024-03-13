import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginUserMutation } from "@/services/userService";
import { toast } from "sonner";

interface ILoginPageProps {}

const formSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const [loginUser, { isLoading, data }] = useLoginUserMutation();
  const navigate = useNavigate();
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: unknown) {
    const { data } = await loginUser(values);
    if (!data.token && data?.error) {
      toast(data?.error.error);
      return false;
    }
    localStorage.setItem("betblack-admin-token", data.token);
    navigate("/tournaments");
  }
  return (
    <section className="h-screen text-black grid place-items-center">
      <article>
        <h1 className="text-4xl my-5">Betblack Admin Panel</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </article>
    </section>
  );
};

export default LoginPage;
