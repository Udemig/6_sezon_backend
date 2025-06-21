import delay from "@/utils/delay";

const Page = async () => {
  await delay(2000);
  throw new Error("Bağlantı zayıf");

  return (
    <div>
      <h1>Login Sayfası</h1>
    </div>
  );
};

export default Page;
