
export class LeadPage
{

    lastnameInput = "//input[@name='lastname']";
    companyinput = "//input[@name='company']";
    savebutton = '(//input[@name="button"])[1]';
   


    page: any;

    constructor(page: any)
    {
        this.page = page;
    }

async createLead(lastname: string, company: string)
   {
   await this.setLastName(lastname);
   //await this.page.waitForTimeout(2000);
   await this.setCompany(company);
   await this.clickSave();
   }

async setLastName(lastname: string)
   {
   await this.page.locator(this.lastnameInput).fill(lastname);
   }

async setCompany(company: string)
   {
   await this.page.locator(this.companyinput).fill(company);
   }

async clickSave()
   {
   await this.page.locator(this.savebutton).click();
   }   


}