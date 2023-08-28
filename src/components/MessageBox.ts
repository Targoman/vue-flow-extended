import { ElMessageBox, messageType } from "element-plus";
// const $lt = makeTranslator()
export default (data: {
	title: string;
	message: string;
	type?: messageType;
	confirmButtonText?: string;
	confirmButtonClass?: string;
	cancelButtonText?: string;
	showConfirmButton?: boolean;
	showCancelButton?: boolean;
	closeOnClickModal?: boolean;
	closeOnPressEscape?: boolean;
	onCancel?: Function;
	onSubmit?: Function;
}) => {
	ElMessageBox({
		closeOnClickModal: data.closeOnClickModal || false,
		closeOnPressEscape: data.closeOnPressEscape || false,
		title: data.title,
		type: data.type,
		message: data.message,
		showCancelButton: data.showCancelButton,
		showConfirmButton: true,
		confirmButtonText: data.confirmButtonText,
		confirmButtonClass: `msgBox-confirm-${data.type}`,
		cancelButtonText: data.cancelButtonText,
		beforeClose: (action, instance, done) => {
			if (action === "confirm") {
				instance.confirmButtonLoading = true;
				if (data.onSubmit) {
					const _submitResult = data.onSubmit();
					if (_submitResult !== true) {
						done();
					}
				} else done();
				instance.confirmButtonLoading = false;
			} else {
				if (data.onCancel) {
					const _cancelResult = data.onCancel();
					if (_cancelResult !== true) {
						done();
					}
				} else done();
			}
		},
	});
};
