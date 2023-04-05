import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
    value: country.cca2, // The two-letter country code (ISO alpha-2 code)
    label: country.name.common, // The common name of the country
    flag: country.flag, // The emoji flag of the country
    latlng: country.latlng, // The latitude and longitude of the country
    region: country.region, // The region of the country (e.g. Africa, Americas, Asia, Europe, Oceania)
}))

const useCountries = () => {
    // Return the "formattedCountries" array.
    const getAll = () => formattedCountries;

    // Take a string "value" as an argument, and return the object from "formattedCountries" array that has a "value" property matching the "value" argument.
    const getByValue = (value: string) => { 
        return formattedCountries.find((item) => item.value === value);
    }

    return {
        getAll,
        getByValue,
    }
}

export default useCountries;