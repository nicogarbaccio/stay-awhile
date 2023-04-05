'use client';
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Enum for tracking the current step in the listing creation process
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const router = useRouter();
    // Use custom hook to manage modal state
    const rentModal = useRentModal();

    // Use useState hook to keep track of the current step and loading state
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    
    // Use react-hook-form to manage form state and validation
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    // Use watch to keep track of form input values
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    // Use useMemo and dynamic to lazy-load the Map component only when needed
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    // Define a custom function for setting form input values
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    }

    // Define event handlers for navigating between form steps
    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    // Define the submit event handler for the form
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // If the current step is not the final step, move to the next step
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        // Otherwise, set the loading state and send the completed form data to the server for processing
        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            // Display a success message and reset the form
            toast.success('Listing created!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() => {
            // Display an error message
            toast.error('Something went wrong!');
        }).finally(() => {
            // Reset the loading state
            setIsLoading(false);
        })
    }

    // Use useMemo to set the labels for the primary and secondary action buttons based on the current step
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step])

    // Define the body content of the modal based on the current step
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place located?" subtitle="Help guests find you!" />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place!"
                    subtitle="What amenities do you have?"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests can you accommodate?" 
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?" 
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?" 
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Showcase your place to guests!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="How would you describe your place?"
                    subtitle="Keep it short and sweet!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Now, set your price"
                    subtitle="How much do you want to charge per night?"
                />
                <Input 
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return(
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Become a host!"
            body={bodyContent}
        />
    )
}

export default RentModal;

/* This code file implements a modal for creating a new rental listing on a website. It contains the following components:

- useRentModal: a custom hook for managing the open/closed state of the modal
- Modal: a reusable component for rendering modals
- useMemo and useState hooks from React
- Heading, CategoryInput, CountrySelect, Map, Counter, ImageUpload, and Input: custom input components
- axios for making HTTP requests
- toast for displaying success and error messages
- useRouter for navigating the user back to the main page of the website
- STEPS enum for keeping track of the current step in the listing creation process

The RentModal component defines the structure of the modal and the workflow for creating a new rental listing. It starts with a single step - selecting a category - and progresses through additional steps as the user enters information. The final step is submitting the completed form to the server for processing. */