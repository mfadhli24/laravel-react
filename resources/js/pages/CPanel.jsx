import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Form, Head, useForm} from "@inertiajs/react";
import TextInput from "../Components/TextInput";
import InputLabel from "../Components/InputLabel";
import Checkbox from "../Components/Checkbox";
import InputError from "../Components/InputError";
import PrimaryButton from "../Components/PrimaryButton";

export default function CPanel() {
    const { data, setData, post, processing, errors } = useForm({
            title: '',
            url: '',
            icon: '',
            order: '',
            is_active: '',
        });
    
        const submit = (e) => {
            e.preventDefault();
    
            post(route('add_menu'), {
            });
        };

    return (
        <AuthenticatedLayout
        
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Control Panel
                </h2>
            }
        >
            <Head title="Control Panel" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="title" value="title"/>
                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        autoComplete="title"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="url" value="url"/>
                                    <TextInput
                                        id="url"
                                        name="url"
                                        value={data.url}
                                        className="mt-1 block w-full"
                                        autoComplete="url"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("url", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError message={errors.url} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="icon" value="icon"/>
                                    <TextInput
                                        id="icon"
                                        name="icon"
                                        value={data.icon}
                                        className="mt-1 block w-full"
                                        autoComplete="icon"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("icon", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError message={errors.icon} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="order" value="order"/>
                                    <TextInput
                                        id="order"
                                        name="order"
                                        value={data.order}
                                        className="mt-1 block w-full"
                                        autoComplete="order"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("order", e.target.value)
                                        }
                                        type="number"
                                        required
                                    />
                                    <InputError message={errors.order} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="is_active" value="is_active">
                                        Aktif di web
                                    </InputLabel>
                                    <Checkbox
                                        id="is_active"
                                        name="is_active"
                                        value={data.is_active}
                                    />
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Tambah Menu
                                    </PrimaryButton>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// createRoot(document.getElementById('root')).render(
//   <CPanel />
// );
