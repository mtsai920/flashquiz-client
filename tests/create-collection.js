const { Builder, Key, By, until } = require('selenium-webdriver')

const createCollection = async function () {
  const driver = await new Builder().forBrowser('chrome').build()

  await driver.get('https://mtsai920.github.io/flashquiz-client/#/')

  const user = {
    email: 'test@test',
    password: 'test'
  }

  if (!driver) {
    console.log('failed to load site')
  } else {
    // Logging in the user
    const signInBtn = driver.wait(until.elementLocated(By.id('sign-in')))
    signInBtn.click()

    const emailInput = driver.wait(until.elementLocated(By.id('email')))
    emailInput.click()
    emailInput.sendKeys(user.email)

    const passwordInput = driver.wait(until.elementLocated(By.id('password')))
    passwordInput.click()
    passwordInput.sendKeys(user.password, Key.RETURN)

    // Creating the collection
    const headerCreate = driver.wait(until.elementLocated(By.linkText('Create')))
    headerCreate.click()

    const titleInput = driver.wait(until.elementLocated(By.id('collection-title')))
    titleInput.click()
    titleInput.sendKeys('hello')

    const descriptionInput = driver.wait(until.elementLocated(By.id('collection-description')))
    descriptionInput.click()
    descriptionInput.sendKeys('hi', Key.RETURN)
  }
}

createCollection()
  .catch((err) => {
    console.log(err)
  })
