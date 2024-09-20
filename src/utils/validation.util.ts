export const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return regex.test(password);
};
export const validateName = (name: string) => {
    const regex = /^[a-zA-ZÀ-ỹ\s]{1,10}$/;
    return regex.test(name);
};