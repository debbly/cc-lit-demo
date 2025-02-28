import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.cyberconnect.dev/testnet/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");
  // console.log("token", token);
  // console.log("process.env.NEXT_PUBLIC_CYBERCONNECT_API_KEY", process.env.NEXT_PUBLIC_CYBERCONNECT_API_KEY);
  return {
    headers: {
      ...headers,
      Authorization: token ? `bearer ${token}` : "",
      "X-API-KEY": process.env.NEXT_PUBLIC_CYBERCONNECT_API_KEY,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
