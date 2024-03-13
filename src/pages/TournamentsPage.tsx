import * as React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TournamentForm from "@/components/TournamentForm";
import {
  useFetchAllTournamentsQuery,
  useDeleteTournamentMutation,
} from "@/services/tournamentsService";

interface ITournamentsPageProps {}
export interface IEditModal {
  [key: number | string]: boolean;
}

const TournamentsPage: React.FunctionComponent<ITournamentsPageProps> = () => {
  const { data, isLoading } = useFetchAllTournamentsQuery(null);
  const [deleteTournament] = useDeleteTournamentMutation();
  const [open, setOpen] = React.useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = React.useState<IEditModal>({});
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<IEditModal>({});

  React.useEffect(() => {
    if (data && data.data.length) {
      const editStates = data?.data?.reduce(
        (acc, _, index) => ({ ...acc, [index]: false }),
        {}
      );
      setEditModalOpen(editStates);
      setDeleteModalOpen(editStates);
    }
  }, [data]);

  if (isLoading) {
    return <p>Fetching tournaments...</p>;
  }

  return (
    <div className="p-3">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-black text-4xl mb-5">Tournaments</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Tournament</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <TournamentForm modalIndex={0} variant="create" closeFn={setOpen} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Game</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Bet Amount</TableHead>
            <TableHead>Prize</TableHead>
            {/* <TableHead>Status</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((t: typeof data, index: number) => (
            <TableRow key={t._id}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.game.name}</TableCell>
              <TableCell>
                {format(new Date(t.startTime), "dd-MM-yyyy")}
              </TableCell>
              <TableCell>{format(new Date(t.endTime), "dd-MM-yyyy")}</TableCell>
              <TableCell>{t.entryFee}</TableCell>
              <TableCell>{t.prize}</TableCell>
              {/* <TableCell>
                <Switch />
              </TableCell> */}
              <TableCell>
                <Dialog
                  open={editModalOpen[index]}
                  onOpenChange={() =>
                    setEditModalOpen((prev) => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
                  }
                >
                  <DialogTrigger asChild>
                    <Button variant="link" size="sm">
                      <img title="Edit" src="/pencil-simple-bold.svg" alt="" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <TournamentForm
                      variant="edit"
                      data={t}
                      closeFn={setEditModalOpen}
                      modalIndex={index}
                    />
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <Dialog
                  open={deleteModalOpen[index]}
                  onOpenChange={() =>
                    setDeleteModalOpen((prev) => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
                  }
                >
                  <DialogTrigger asChild>
                    <Button variant="link" size="sm">
                      <img title="Delete" src="/trash.svg" alt="" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    Do you wish to delete this tournament?
                    <Button
                      onClick={async () => {
                        await deleteTournament(t._id);
                        setDeleteModalOpen((prev) => ({
                          ...prev,
                          [index]: false,
                        }));
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => {
                        setDeleteModalOpen((prev) => ({
                          ...prev,
                          [index]: false,
                        }));
                      }}
                      variant="destructive"
                    >
                      No
                    </Button>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TournamentsPage;
