import * as yup from "yup";
import { Dispatch, SetStateAction, useEffect } from "react";
import Calendar from "react-calendar";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { IEditModal } from "@/pages/TournamentsPage";
import {
  useFetchAllGamesQuery,
  useCreateTournamentMutation,
  useUpdateTournamentMutation,
} from "@/services/tournamentsService";
const formSchema = yup.object({
  name: yup.string().required("Tournament name is required"),
  description: yup.string().required("Tournament description is required"),
  startTime: yup.date().required("Start time is required"),
  endTime: yup.date().required("End time is required"),
  entryFee: yup.string().required("Bet amount is required"),
  prize: yup.string().required("Prize is required"),
  game: yup.string().required("Game is required"),
  maxTries: yup.string().required("Max tries is required"),
});
interface ITournamentsFormProps {
  variant: "create" | "edit";
  data?: {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    entryFee: string;
    maxTries: string;
    prize: string;
    game: unknown;
  };
  modalIndex: number | string;
  closeFn:
    | Dispatch<SetStateAction<boolean>>
    | Dispatch<SetStateAction<IEditModal>>;
}
function TournamentForm(props: ITournamentsFormProps) {
  const { data, isLoading } = useFetchAllGamesQuery(null);
  const [createTournament] = useCreateTournamentMutation();
  const [updateTournament] = useUpdateTournamentMutation();
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      startTime: new Date(),
      endTime: new Date(),
      entryFee: "",
      prize: "",
      game: "",
      maxTries: "",
    },
  });
  useEffect(() => {
    if (props.variant === "edit" && props.data) {
      form.setValue("name", props.data?.name);
      form.setValue("game", props.data?.game._id);
      form.setValue("description", props.data?.description);
      form.setValue("startTime", props.data?.startTime);
      form.setValue("endTime", props.data?.endTime);
      form.setValue("entryFee", props.data?.entryFee);
      form.setValue("prize", props.data?.prize);
      form.setValue("maxTries", props.data?.maxTries);
    }
  }, [props.variant, props.data, form]);

  async function onSubmit(values: unknown) {
    console.log(values);
    if (props.variant === "create") {
      await createTournament(values);
      props.closeFn(false);
    }
    if (props.variant === "edit") {
      await updateTournament({ id: props.data?._id, body: values });
      props.closeFn((prev) => ({ ...prev, [props.modalIndex]: false }));
    }
  }
  if (isLoading) {
    return <p>Loading form...</p>;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter tournament name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter tournament description"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="game"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select game" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.data.map((game) => (
                      <SelectItem value={game._id}>{game.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Calendar onChange={field.onChange} value={field.value} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Calendar onChange={field.onChange} value={field.value} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="entryFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bet Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter bet amount" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxTries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Tries</FormLabel>
              <FormControl>
                <Input placeholder="Enter max tries" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prize</FormLabel>
              <FormControl>
                <Input placeholder="Enter tournament prize" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {props.variant === "create" ? "Create Tournament" : "Edit Tournament"}
        </Button>
      </form>
    </Form>
  );
}
export default TournamentForm;
