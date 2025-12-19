/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	type FormValidator = import('simple-stack-form/module').FormValidator;
	type GetDataResult<T extends FormValidator> =
		| {
				data: import('zod').output<import('zod').ZodObject<T>>;
				fieldErrors: undefined;
		  }
		| {
				data: undefined;
				fieldErrors: import('zod').ZodError<
					import('zod').output<import('zod').ZodObject<T>>
				>['formErrors']['fieldErrors'];
		  };
}
