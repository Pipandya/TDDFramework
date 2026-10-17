import {test,expect} from "@playwright/test";
import { LoginPage } from "../Pages/loginPage";
import { HomePage } from "../Pages/homePage";
import { LeadPage } from "../Pages/leadPage";
//import { getTestData } from "../utility/csv_Reader";
import { getTestData } from "../utility/execel_Reader";


test('TC03_Create_lead_with_mandatory_fields',async({page})=>{
 const td = getTestData('TC03_Create_lead_with_mandatory_fields');
    page.goto('/');
    const loginPage=new LoginPage(page);
    await loginPage.login(td['Username'], td['Password']);
    const homepage = new HomePage(page);
    await expect(homepage.verifyHomeLink()).toBeTruthy();
    await homepage.clickNewLeadLink();
    const leadPage = new LeadPage(page);
    await leadPage.createLead(td['Lastname'], td['Company']);
    await page.waitForTimeout(2000);
    
    await homepage.clickLogout();

});