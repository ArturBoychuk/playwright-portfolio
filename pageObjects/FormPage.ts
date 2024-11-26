import { Page, Locator, expect } from '@playwright/test'

export class FormPage {
    private readonly page: Page 
    private readonly form: Locator
    private readonly firstName: string
    private readonly lastName: string
    private readonly email: string
    private readonly phone: string

    constructor(page: Page) {
        this.page = page;
        this.form = page.locator('#userForm')
        this.firstName = process.env.FIRST_NAME || 'John'
        this.lastName = process.env.LAST_NAME || 'Wick'
        this.email = process.env.EMAIL || 'test@test.com'
        this.phone = process.env.PHONE || '1234567890'
    }

    async fillForm() {
        await expect(this.form).toBeVisible()

        await this.fillFirstName(this.firstName)

        await this.fillLastName(this.lastName)

        await this.fillEmail(this.email)

        await this.chooseGender('Male')

        await this.fillPhoneNumber(this.phone)

        await this.chooseDateOfBirth('1993-10-15')

        await this.chooseHobbies()

        await this.chooseSubjects()

        await this.uploadPhoto()

        await this.fillAddress()

        await this.chooseState()

        await this.chooseCity()
    }

    async fillFormWithInvalidPhone() {
        await expect(this.form).toBeVisible()

        await this.fillFirstName(this.firstName)

        await this.fillLastName(this.lastName)

        await this.fillEmail(this.email)

        await this.chooseGender('Male')

        await this.fillPhoneNumber('abcdedfgh')

        await this.chooseDateOfBirth('1993-10-15')

        await this.chooseHobbies()

        await this.chooseSubjects()

        await this.uploadPhoto()

        await this.fillAddress()

        await this.chooseState()

        await this.chooseCity()
    }

    async fillFirstName(firstName: string) {
        const firstNameField = this.form.locator('#firstName')
        firstNameField.pressSequentially(firstName)
        await expect(firstNameField).toHaveValue(firstName);
    }

    async fillLastName(lastName: string) {
        const lastNameField = this.form.locator('#lastName')
        lastNameField.pressSequentially(lastName)
        await expect(lastNameField).toHaveValue(lastName);
    }

    async fillEmail(email: string) {
        const emailField = this.form.locator('#userEmail')
        emailField.pressSequentially(email)
        await expect(emailField).toHaveValue(email);
    }

    async chooseGender(gender: string) {
        const genderOption = this.form.locator(`[value="${gender}"] ~ label`)
        await genderOption.check()
        expect(genderOption).toBeChecked()
    }

    async fillPhoneNumber(phoneNumder: string) {
        const phoneField = this.form.locator('#userNumber')
        await phoneField.pressSequentially(phoneNumder)
        await expect(phoneField).toHaveValue(phoneNumder)
    }

    async chooseDateOfBirth(dateOfBirth: string) {
        const dateOfBirthInput = this.form.locator('#dateOfBirthInput')
        await dateOfBirthInput.click()
        const datePickerContainer = this.form.locator('.react-datepicker')
        const date = new Date(dateOfBirth);

        const monthSelect = datePickerContainer.locator('.react-datepicker__month-select')
        const fullMonthName = date.toLocaleString('en-US', { month: 'long' })   
        await monthSelect.selectOption({ label: fullMonthName })

        const yearSelect = datePickerContainer.locator('.react-datepicker__year-select')
        const year = date.getFullYear().toString()
        await yearSelect.selectOption({ label: year })

        const day = date.getDate()
        await datePickerContainer.locator(`.react-datepicker__day:has-text("${day}")`).click();

        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        };
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
        const inputValue = await dateOfBirthInput.getAttribute('value');
        expect(inputValue).toBe(formattedDate);
    }

    async chooseHobbies() {
        const hobbiesCheckbox = this.form.locator('[for*="hobbies-checkbox"]:has-text("Reading")');
        await hobbiesCheckbox.check()
        expect(hobbiesCheckbox).toBeChecked()
    }
    
    async chooseSubjects() {
        const subjectField = this.form.locator('#subjectsContainer')
        await subjectField.click()
        await subjectField.pressSequentially('His')
        await this.form.locator('.subjects-auto-complete__option:has-text("History")').click()
        await expect(subjectField.locator('.subjects-auto-complete__multi-value__label:has-text("History")')).toBeVisible();

        await subjectField.click()
        await subjectField.pressSequentially('Ma')
        await this.form.locator('.subjects-auto-complete__option:has-text("Math")').click()
        await expect(subjectField.locator('.subjects-auto-complete__multi-value__label:has-text("Math")')).toBeVisible();
    }

    async uploadPhoto() {
        const filePath = './media/student_photo.jpg';
        const fileInput = this.form.locator('#uploadPicture')
        await fileInput.setInputFiles(filePath)
    }

    async fillAddress() {
        const adressField = this.form.locator('#currentAddress')
        adressField.pressSequentially('149 Christine Drive, Dix Hills, New York 11746')
        await expect(adressField).toHaveValue('149 Christine Drive, Dix Hills, New York 11746');
    }

    async chooseState() {
        const stateSelect = this.form.locator('#state')
        await stateSelect.click()
        await stateSelect.locator('[class*="option"]:has-text("Haryana")').click()
    }

    async chooseCity() {
        const citySelect = this.form.locator('#city')
        await citySelect.click()
        await citySelect.locator('[class*="option"]:has-text("Karnal")').click()
    }

    async submitForm() {
        //since this form is fake there is no POST request
        await this.form.locator('#submit').click()

        const invalidFieldsQuantinty = await this.page.locator('.form-control:invalid').count();
        
        if (invalidFieldsQuantinty === 0) {
            await expect(this.page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
        }
    }

    async goToFormPage() {
        await this.page.locator('.card-body :has-text("Forms")').click()
        await this.page.locator('.btn-light :has-text("Practice Form")').click()
    }
}
