export type SignInFlow = "signIn" | "signUp";

/*
1.A custom type named SignInFlow. This type can only have one of two specific string values: "signIn" or "signUp"
2. type: This keyword is used to define a new type alias in TypeScript
3. "signIn" | "signUp": This defines a union type where SignInFlow can be either "signIn" or "signUp".

function handleSignInFlow(flow: SignInFlow) {
  if (flow === "signIn") {
    // Handle sign-in logic
  } else if (flow === "signUp") {
    // Handle sign-up logic
  }
}

*/
