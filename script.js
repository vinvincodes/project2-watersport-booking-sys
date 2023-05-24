// Define the Vue.js components for different routes/views
const Home = { template: "#home" };
const packageVue = { template: "#package-vue" };
const jetskiDesc = { template: "#description-jetski" };
const boatDesc = { template: "#description-bananaboat" };
const snorkelDesc = { template: "#description-snorkel" };

const login = {
  template: "#login",
  data() {
    return {
      emailLogin: "",
      passwordLogin: ""
    };
  },
  methods: {
    loginUser(event) {
      event.preventDefault();

      // Retrieve the entered email and password
      const email = this.emailLogin;
      const password = this.passwordLogin;

      // Clear the form fields
      this.emailLogin = "";
      this.passwordLogin = "";

      // Redirect to the desired page after successful login.
      this.$router.push("/");

      // Show an alert message once successfully login.
      alert("Login successful!");
    }
  }
};

const signin = {
  template: "#sign-in",
  data() {
    return {
      emailSign: "",
      passwordSign: "",
      confirmPassword: ""
    };
  },
  methods: {
    registerUser(event) {
      event.preventDefault();

      // Validation checks
      // e.g., 123 !== abc (which mean true, then show alert)
      if (this.passwordSign !== this.confirmPassword) {
        alert("The password doesn't match ❌. Please try again.");
        return;
      }

      // Get the form data from the Vue component data.
      const emailReg = this.emailSign;
      const passwordReg = this.passwordSign;

      // Display the form data in the console.
      console.log("Email: " + emailReg);
      console.log("Password: " + passwordReg);

      // to reset the form
      this.emailSign = "";
      this.passwordSign = "";
      this.confirmPassword = "";

      // Redirect to the desired page.
      this.$router.push("/");

      // Show an alert message.
      alert("Your sign-in was successful!");
    }
  }
};

const contact = {
  template: "#contact",
  data() {
    return {
      nameContact: "",
      emailContact: "",
      messageContact: ""
    };
  },
  methods: {
    contactForm(event) {
      event.preventDefault();

      // Get the form data from the Vue component data.
      const nameCont = this.nameContact;
      const emailCont = this.emailContact;
      const messageCont = this.messageContact;

      // It will display the form data in the console
      console.log("Name: " + nameCont);
      console.log("Email: " + emailCont);
      console.log("Message: " + messageCont);

      // Display a thank you message for contact
      alert("Thanks for your contact!😄");

      // Reset the form fields
      this.nameContact = "";
      this.emailContact = "";
      this.messageContact = "";

      // Redirect to the main page.
      this.$router.push("/");
    }
  }
};

// to make function for booking system
const bookingsys = {
  template: "#booking-sys",
  data() {
    return {
      totalAdults: "",
      totalChildren: "",
      bookingDate: "",
      locationPreference: "",
      message: "",
      selectedActivity: "",

      // Define the available durations for the activity
      durations: [
        { id: "15min", label: "15 Min", price: "" },
        { id: "30min", label: "30 Min", price: "" },
        { id: "60min", label: "60 Min", price: "" }
      ],

      // define the prices for every activity and duration combination.
      activityPrices: {
        Jetski: {
          "15min": "Rp 150.000",
          "30min": "Rp 300.000",
          "60min": "Rp 600.000"
        },
        "Banana-Boat": {
          "15min": "Ro 50.000",
          "30min": "Rp 100.000",
          "60min": "Rp 200.000"
        },
        Snorkel: {
          "15min": "Rp 32.500",
          "30min": "Rp 65.000",
          "60min": "Rp 130.000"
        }
      }
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault(); // Prevent the form from submitting

      // Check if a radio button is selected
      const radioButtons = document.querySelectorAll(
        'input[type="radio"][name="brandtype"]'
      );
      const isChecked = Array.from(radioButtons).some(
        (button) => button.checked
      );

      if (!isChecked) {
        // Display an error message that asked you need to fill in the select price and duration.
        alert("Please select a price💵 & duration⏳ option.");
        return; // Stop the form submission
      }

      // refresh the data to select activity
      this.selectedActivity = event.target.elements.watersport_selects.value;

      // Access the form data
      const formData = new FormData(event.target);
      this.totalAdults = formData.get("total_adults");
      this.totalChildren = formData.get("total_children");
      this.bookingDate = formData.get("checkin");
      this.locationPreference = formData.get("location_preference");
      this.message = formData.get("visitor_message");

      // It will display the form data for alert.
      const displayData = `Watersport: ${this.selectedActivity}\nTotal Adults: ${this.totalAdults}\nTotal Children: ${this.totalChildren}\nBooking Date: ${this.bookingDate}\nLocation Preference: ${this.locationPreference}\nMessage: ${this.message}`;
      alert(displayData);

      // Display the alert message
      alert("Your reservation has been booked!");

      // Navigate to go back home page once complete the booking system form.
      this.$router.push("/");
    }
  },
  watch: {
    // // This watch function gets called anytime the value of 'selectedActivity' changes.
    selectedActivity: function (newActivity) {
      // Get the activityPrices object's pricing for the chosen activity.
      // If no prices are provided for the specified activity, return an empty object.
      const prices = this.activityPrices[newActivity] || {};

      // 'durations' array's durations are iterated through one by one.
      this.durations.forEach((duration) => {
        // Based on the matching price in the 'prices' object, update each duration's 'price' property.
        // If no pricing is offered for a particular duration, return to an empty string.
        duration.price = prices[duration.id] || "";
      });
    }
  }
};

const routes = [
  { path: "", component: Home },
  { path: "/sign-in", component: signin },
  { path: "/contact", component: contact },
  { path: "/login", component: login },
  { path: "/package-vue", component: packageVue },
  { path: "/description-jetski", component: jetskiDesc },
  { path: "/description-bananaboat", component: boatDesc },
  { path: "/description-snorkel", component: snorkelDesc },
  { path: "/booking-sys", component: bookingsys }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  data() {
    return {
      showMenu: false,
      showDropdown: false,
      emailLogin: "",
      passwordLogin: ""
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    loginUser(event) {
      event.preventDefault();

      // Retrieve the entered email and password
      const email = this.emailLogin;
      const password = this.passwordLogin;

      // Clear the form fields
      this.emailLogin = "";
      this.passwordLogin = "";
    }
  }
}).$mount("#app");