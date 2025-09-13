import React from 'react'
import { useProductStore } from '../store/useProductStore';
import { IndianRupeeIcon, Package2Icon , PlusCircleIcon} from 'lucide-react';

export default function AddProductModal() {
    const {addProduct,formData,setFormData , loading} = useProductStore();
    return (
    <dialog id="add_product_modal" className="modal">
        <div className='modal-box'>
            {/*Close Button*/}
            <form method="dialog" >
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                </button>
            </form>
            {/*Title*/}
            <h3 className="font-bold text-lg mb-4">Add New Product</h3>
            {/*Form*/}
            <form onSubmit={addProduct} className='space-y-6'>
                <div className='grid gap-6'>
                    {/* Name */}
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Product Name</span>
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none 
                            text-base-content/50'>
                                <Package2Icon className='size-5' />
                            </div>
                            <input 
                                type="text" 
                                placeholder='Product Name' 
                                className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors
                                duration-200' 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>
                    {/* Price */}
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text text-base font-medium'>Price</span>
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none 
                            text-base-content/50'>
                                <IndianRupeeIcon className='size-5' />
                            </div>
                            <input 
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"  
                                className='input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors
                                duration-200' 
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                            />
                        </div>
                    </div>
                    {/* Description */}
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text text-base font-medium'>Description</span>
                        </label>
                        <textarea
                            className='textarea textarea-bordered w-full h-24 focus:textarea-primary transition-colors
                            duration-200'
                            placeholder='Product Description'
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                    </div>
                    {/* Image URL */}
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text text-base font-medium'>Image URL</span>
                        </label>
                        <input
                            type="url"
                            className='input input-bordered w-full focus:input-primary transition-colors
                            duration-200'
                            placeholder='https://example.com/image.jpg'
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            required
                        />
                    </div>
                </div>
                {/* MODAL ACTIONS */}
                <div className="modal-action">
                    <form method="dialog">
                    <button className="btn btn-ghost">Cancel</button>
                    </form>
                    <button
                    type="submit"
                    className="btn btn-primary min-w-[120px]"
                    disabled={!formData.name || !formData.price || !formData.image || loading}
                    >
                    {loading ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        <>
                        <PlusCircleIcon className="size-5 mr-2" />
                        Add Product
                        </>
                    )}
                    </button>
                </div>
            </form>
        </div>
        {/* BACKDROP */}
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
  )
}
