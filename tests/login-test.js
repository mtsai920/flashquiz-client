const { Builder, Key, By, until } = require('selenium-webdriver')

const login = async function () {
  const driver = await new Builder().forBrowser('chrome').build()

  await driver.get('https://mtsai920.github.io/flashquiz-client/#/')

  // Replace this with any other login credentials
  const user = {
    email: 'test@test',
    password: 'test'
  }

  if (!driver) {
    console.log('Failed to load page')
  } else {
    const loginButton = driver.wait(until.elementLocated(By.linkText('Sign In')))
    loginButton.click()

    const email = driver.wait(until.elementLocated(By.id('email')))
    email.click()
    email.clear()
    email.sendKeys(user.email)

    const password = driver.wait(until.elementLocated(By.id('password')))
    password.click()
    password.clear()
    password.sendKeys(user.password, Key.RETURN)
  }
}

login()
  .catch(err => {
    console.log(err)
  })
