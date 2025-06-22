export type RegisterationDTO = {
    username: string;
    phoneNumber: string;
    aadharNumber: string;
    panNumber: string;
    email: string;
    passwordHash: string;
    isVerified?: "pending" | "verified" | "rejected" | undefined;
    userType?: "regular"
}