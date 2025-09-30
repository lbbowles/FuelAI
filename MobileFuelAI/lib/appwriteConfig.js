import {Client, Account} from "react-native-appwrite";
import {Platform} from "react-native";

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

//Check client platform (I currently only support iOS)
switch (Platform.OS) {
    case "web":
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);
        break;
    case "android":
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);
        break;
    case "ios":
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID);
        break;
}

const account = new Account(client);

export {account};