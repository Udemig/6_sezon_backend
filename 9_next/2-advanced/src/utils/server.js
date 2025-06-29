"use server";

const handleAction = async (initialState, formData) => {
  // server action olarka ifade etmemizi sağlar

  // inputlardaki veirlere eriş
  const name = formData.get("name");
  const email = formData.get("email");

  // doğrudan mongodb methodu çalıştırabilirz
  //! Mongo.users.create({ name, email });
};

export default handleAction;
