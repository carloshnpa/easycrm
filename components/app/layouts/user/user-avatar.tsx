'use server'

import {createClient} from "@/utils/supabase/server";
import UserAvatarComponent from "@/components/app/layouts/user/user-avatar-component";

export default async function UserAvatar() {

    const supabase = createClient()

    const {
        data: {user},
    } = await supabase.auth.getUser()

    const {data, error, status} = await supabase
        .from('profiles')
        .select()
        .eq('id', user?.id)
        .maybeSingle()

    let urlAvatar = '/img/placeholder.svg'
    if (data?.avatar_url) {
        const urlPublic = await supabase.storage.from('avatars').createSignedUrl(data?.avatar_url, 24 * 60 * 60)
        if (urlPublic.data?.signedUrl) urlAvatar = urlPublic.data?.signedUrl
    }
    return <UserAvatarComponent avatarUrl={urlAvatar}/>
}
