import { toast } from "react-toastify";

export const toastySuccess = (message) => {
	toast(`🦄 ${message}`, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
	console.log("Showing The Toasty");
};
export const toastyFailure = (message) => {
	toast.error(`🦄 ${message}`, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
	console.log("Showing The error Toasty");
};
