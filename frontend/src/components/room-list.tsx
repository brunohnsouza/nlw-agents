import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { dayjs } from "@/lib/dayjs";
import { ArrowRight } from "lucide-react";
import { useRooms } from "@/http/use-rooms";

export function RoomList() {
    const { data, isLoading } = useRooms()

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Salas recentes
                </CardTitle>
                <CardDescription>
                    Acesso rápido para as salas criadas recentemente.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {isLoading && (
                    <div className="flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">Carregando...</span>
                    </div>
                )}

                {!isLoading && data?.length === 0 && (
                    <div className="flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">Nenhuma sala encontrada.</span>
                    </div>
                )}

                {data?.map((room) => (
                    <Link
                        className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
                        key={room.id}
                        to={`/rooms/${room.id}`}
                    >
                        <div className="flex flex-1 flex-col gap-1">
                            <h3 className="font-medium">{room.name}</h3>

                            <div className="flex items-center gap-2">
                                <Badge className="text-xs" variant="secondary">
                                    {dayjs(room.createdAt).toNow()}
                                </Badge>

                                <Badge className="text-xs" variant="secondary">
                                    {room.questionsCount} pergunta{room.questionsCount > 1 ? 's' : ''}
                                </Badge>
                            </div>
                        </div>

                        <span className="flex items-center gap-1 text-sm">
                            Entrar
                            <ArrowRight className="size-3 shrink-0" />
                        </span>
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
}