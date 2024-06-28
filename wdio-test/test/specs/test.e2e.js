import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()
        await browser.pause(10000)
        await expect(LoginPage.nginxBanner).toHaveTextContaining(
            'Welcome to nginx!')
    })
})

