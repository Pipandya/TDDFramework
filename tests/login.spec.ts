import {test,expect} from "@playwright/test";
import { LoginPage } from "../Pages/loginPage";
import { HomePage } from "../Pages/homePage";
//import { getTestData } from "../utility/csv_Reader";
import { getTestData } from "../utility/execel_Reader";

test('TC01_invalid_login_test' , async ({page}) => {
    const td = getTestData('TC01_invalid_login_test');
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(td['Username'], td['Password']);
    await expect(loginPage.verifyErrorMsg()).toBeTruthy();
});

test('TC02_Valid_login_test' , async ({page}) => {
    const td = getTestData('TC02_Valid_login_test');
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(td['Username'], td['Password']);
    await expect(page.locator('//a[text()="Logout"]')).toBeVisible();
    const homePage = new HomePage(page);
    await expect(homePage.verifyHomeLink()).toBeTruthy();    
});