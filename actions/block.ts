"use server"

import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unBlockedUser } from "@/lib/block-sevice"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (id: string) => {

    const self = await getSelf();

    let blockedUser

    blockedUser = await blockUser(id);


    await roomService.removeParticipant(self.id, id)


    revalidatePath(`/u/${self.username}/community`);

    if (blockedUser) {
        revalidatePath(`/${blockedUser.blocked.username}`);
    }

    return blockedUser
}

export const onUnblock = async (id: string) => {
    const self = await getSelf();
    const unblockedUser = await unBlockedUser(id);

    revalidatePath(`/u/${self.username}/ coummnity`);

    return unblockedUser;
}