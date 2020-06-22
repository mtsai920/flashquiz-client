const { Builder, Key, By, until } = require('selenium-webdriver')

const signUp = async function () {
  const driver = await new Builder().forBrowser('chrome').build()

  await driver.get('https://mtsai920.github.io/flashquiz-client/#/')

  // Randomize these credentials for signing up
  const user = {
    email: 'test@random',
    password: 'random'
  }

  if (!driver) {
    console.log('Falied to load page')
  } else {
    const signUpBtn = driver.wait(until.elementLocated(By.linkText('Sign Up')))
    signUpBtn.click()

    const email = driver.wait(until.elementLocated(By.id('email')))
    email.click()
    email.clear()
    email.sendKeys(user.email)

    const password = driver.wait(until.elementLocated(By.id('password')))
    password.click()
    password.sendKeys(user.password)

    const passwordConf = driver.wait(until.elementLocated(By.id('passwordConfirmation')))
    passwordConf.click()
    passwordConf.sendKeys(user.password, Key.RETURN)
  }
}

signUp()
