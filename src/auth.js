import * as msal from "@azure/msal-browser"

const msalConfig = {
    auth: {
        clientId: '4dd4379b-b8f7-4de5-9af5-e28991677778',
        authority: 'https://login.microsoftonline.com/d7cbbb08-47a3-4bd7-8347-5018f2744cfb',
        redirectUri: "http://localhost:8080/blank.html"
    }
}

const scopes = ["User.Read", "Calendars.ReadWrite"]

export default {
    msalInstance: new msal.PublicClientApplication(msalConfig),
    scopes,

    async login() {
        try {
            const loginResponse = await this.msalInstance.loginPopup({
                scopes: this.scopes
            })

            return loginResponse
        } catch (err) {
            alert(err)
            return null
        }
    },
    getAccountInfo() {
        const accounts = this.msalInstance.getAllAccounts()

        if (accounts && accounts.length > 0) {
            return accounts[0]
        } else {
            return null
        }
    },
    async logoff() {
        await this.msalInstance.logoutPopup({})
    }
}
