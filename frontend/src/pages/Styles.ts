export const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "rgba(17, 15, 15, 1)",
    color: "white",

    // placeholder;
    "&::placeholder": {
        color: "rgba(138, 138, 138, 1)",
    },

    //Calendario de date branco;
    "&::-webkit-calendar-picker-indicator": {
        filter: "brightness(0) invert(1)",
        cursor: "pointer",
    },
};