import React from 'react'
import { useProductStore } from '../store/useProductStore'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, SaveIcon, Trash2Icon , IndianRupeeIcon ,Package2Icon } from 'lucide-react'

export default function ProductPage() {
  const {currentProduct, formData, setFormData, loading, error, fetchProduct, updateProduct,deleteProduct} = useProductStore();
  const navigate = useNavigate();
  const {id} = useParams();
  React.useEffect(() => {
    fetchProduct(id);
  },[fetchProduct,id]);

  const handleDelete = async() => {
    if(window.confirm("Are you sure you want to delete this product?")){
    await deleteProduct(id);
    navigate("/");
    }
  };

  if(loading){
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='loading loading-spinner loading-lg'/>
      </div>
    )
  }

  if(error){
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='alert alert-error'>
          <span>{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <button onClick={() => navigate("/")} className='btn btn-ghost mb-8'>
        <ArrowLeftIcon className='mr-2 h-5 w-5' />
        Back To Products
      </button>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Product Image */}
        {currentProduct ? (
          <img src={currentProduct.image} alt={currentProduct.name} className='size-full object-cover rounded-lg' />
        ) : (
          <div className='size-full bg-gray-200 flex items-center justify-center rounded-lg'>
            <span className='text-gray-500'>Loading image...</span>
          </div>
        )}
        {/* Product Details */}
        <div className='card bg-base-100 shadow-lg'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-6'>Edit Product</h2>

            <form onSubmit={(e) => {e.preventDefault(); updateProduct(id)}} className='space-y-6'>
              {/* PRODUCT NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Product Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* PRODUCT PRICE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Price</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              {/* PRODUCT IMAGE URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Image URL</span>
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* PRODUCT DESCRIPTION */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Description</span>
                </label>
                <textarea
                  placeholder="Enter product description"
                  className="textarea textarea-bordered w-full"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              {/*Form action buttons*/}
              <div className='flex justify-between mt-8'>
                <button type='button' onClick={handleDelete} className='btn btn-error'>
                  <Trash2Icon className='mr-2 h-5 w-5' />
                  Delete Product
                </button>
                <button type='submit' className='btn btn-primary' disabled={loading || !formData.name ||
                  !formData.price || !formData.description || !formData.image}>
                  {loading ? (<span className='loading loading-spinner loading-sm'></span>) : (<>
                  <SaveIcon className='size-4 mr-2' />
                  Save Changes
                  </>)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
