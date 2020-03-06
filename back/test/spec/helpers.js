export const cleanDB = async (db) => {
    await db.User.deleteMany();
}