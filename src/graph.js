import { InteractionType } from "@azure/msal-browser"
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser"
import { Client } from "@microsoft/microsoft-graph-client"

import auth from "./auth"

const options = {
    account: auth.getAccountInfo(),
    interactionType: InteractionType.PopUp,
    scopes: auth.scopes
}

const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(auth.msalInstance, options)


export default Client.initWithMiddleware({
    authProvider
})