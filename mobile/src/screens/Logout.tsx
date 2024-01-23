import { useAuth } from "@hooks/useAuth";
import { Button, Center } from "native-base";

export function Logout() {

  const { signOut } = useAuth();

  return(
    <Center flex={1}>
      <Button
        onPress={signOut}
      >
        Sair
      </Button>
    </Center>
  )
}