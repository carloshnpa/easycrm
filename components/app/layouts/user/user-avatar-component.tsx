'use client'
export default function UserAvatarComponent({avatarUrl}: { avatarUrl: string }) {
    return (
        <img
            alt="Avatar"
            className="rounded-full"
            height="32"
            src={avatarUrl}
            style={{
                aspectRatio: "32/32",
                objectFit: "cover",
            }}
            width="32"
        />
    )
}
