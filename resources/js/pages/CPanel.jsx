import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
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
        is_active: false,
    });
    
    const submit = (e) => {
        e.preventDefault();
        console.log('Form dikirim:', data);
        
        // Sesuaikan nama route dengan milik Anda di routes/web.php
        post(route('menu.create'));
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
                            {/* Menggunakan tag <form> standar HTML */}
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        autoComplete="title"
                                        isFocused={true}
                                        onChange={(e) => setData("title", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="url" value="URL" />
                                    <TextInput
                                        id="url"
                                        name="url"
                                        value={data.url}
                                        className="mt-1 block w-full"
                                        autoComplete="url"
                                        onChange={(e) => setData("url", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.url} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="icon" value="Icon (FontAwesome/SVG)" />
                                    <TextInput
                                        id="icon"
                                        name="icon"
                                        value={data.icon}
                                        className="mt-1 block w-full"
                                        autoComplete="icon"
                                        onChange={(e) => setData("icon", e.target.value)}
                                    />
                                    <InputError message={errors.icon} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="order" value="Urutan (Order)" />
                                    <TextInput
                                        id="order"
                                        name="order"
                                        type="number"
                                        value={data.order}
                                        className="mt-1 block w-full"
                                        autoComplete="order"
                                        onChange={(e) => setData("order", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.order} className="mt-2" />
                                </div>

                                <div className="block mt-4">
                                    <label className="flex items-center">
                                        <Checkbox
                                            id="is_active"
                                            name="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData("is_active", e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                            Aktif di web
                                        </span>
                                    </label>
                                    <InputError message={errors.is_active} className="mt-2" />
                                </div>

                                <div className="mt-6 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Tambah Menu
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}