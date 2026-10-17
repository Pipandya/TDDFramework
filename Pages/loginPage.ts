export class LoginPage {

    uernameInput = "//input[@name ='user_name']";
    passwordInput = "//input[@name = 'user_password']";
    loginButton = "//input[@name = 'Login']";
    errMsg = '//*[contains(text(), "You must specify a valid username and password.")]';


 page:any;

    constructor(page:any){
        this.page = page;
    }

    async login(userid:string , password:string){
        await this.setUserName(userid);
        await this.setPassword(password);
        await this.clickLogin();
    }

    async setUserName(userid:string){
        await this.page.locator(this.uernameInput).fill(userid);
    }

    async setPassword(password:string){
        await this.page.locator(this.passwordInput).fill(password);
    }

    async clickLogin(){
        await this.page.locator(this.loginButton).click();
    }

     async verifyErrorMsg(){
        return await this.page.locator(this.errMsg).isVisible();
    }
}