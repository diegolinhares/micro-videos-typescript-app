export type FieldsErrors = {
  [field: string]: string[]
}

export default interface ValidatorFieldsInteface<PropsValidated> {
  errors: FieldsErrors,
  validatedData :PropsValidated
  validate(data: any): boolean
}