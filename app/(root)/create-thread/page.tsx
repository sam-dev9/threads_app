import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/PostThread";
const page = async () => {
  const user = await currentUser();
  
  if (!user) return null;
  
  const userInfo = await fetchUser(user.id);
  console.log("here is create thread page",user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <div className="head-text">create thread</div>
      <PostThread userId={userInfo._id} userInfo={userInfo}/>
    </>
  );
};

export default page;
