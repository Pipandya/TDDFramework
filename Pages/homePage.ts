export class HomePage {

    linkNewLead = "//a[text() ='New Lead']";
    linkLogout = "//a[text()= 'Logout']";
    linkLeads = "//a[text() = 'Login']";
    linkHome = "//a[text() = 'Home']";

    page:any;

    constructor(page:any){
        this.page = page;
    }

    async verifyHomeLink():Promise<boolean>{
        return await this.page.locator(this.linkHome).isVisible();
    }

    async verifyLeadsLink():Promise<boolean>{
        return await this.page.locator(this.linkLeads).isVisible();
    }

    async veryfyNewLeadsLink():Promise<boolean>{
        return await this.page.locator(this.linkNewLead).isVisible();
    }

    async veryfiLogoutLink():Promise<boolean>{
        return await this.page.locator(this.linkLogout).isVisible();
    }

    async clickNewLeadLink(){
        await this.page.locator(this.linkNewLead).click();
    }

    async clickLeadsLink(){
        await this.page.locator(this.linkLeads).click();
    }

     async clickLogout(){
        await this.page.locator(this.linkLogout).click();
    }

}