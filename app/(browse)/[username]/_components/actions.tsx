"use server";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string
}

export const Actions = ({
    isFollowing,
    userId,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following"${data.following.username}`))
                .catch(() => toast.error("something went wrong"));
        });
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnFollow(userId)
                .then((data) => toast.success(`You have unfollowed"${data.following.username}`))
                .catch(() => toast.error("something went wrong"));
        });
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`${data.blocked.username} is now blocked`))
                .catch((error) => toast.error(`${error}`));
        });
    };

    const unblockUser = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`${data.blocked.username} is now unblocked`))
                .catch((error) => toast.error(`${error}`));
        });
    };


    return (
        <>
            <Button disabled={isPending}
                onClick={onClick}
                variant="primary">
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button onClick={handleBlock} disabled={isPending}>
                Block
            </Button>
        </>
    )
}