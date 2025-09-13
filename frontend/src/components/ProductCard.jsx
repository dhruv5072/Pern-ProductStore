import { EditIcon , TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';

export default function ProductCard({product}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {deleteProduct} = useProductStore();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    deleteProduct(product.id);
  }

  return (
    <div className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${isExpanded ? 'max-w-full' : ''}`}>
        {/* Image */}
        <figure className='relative pt-[56.25%]'>
            <img src={product.image} alt={product.name} className='absolute top-0 left-0 w-full h-full object-contain rounded-t-lg' />
        </figure>
        
        {/* Body */}
        <div className="card-body">
            <h2 className="card-title text-lg font-semibold">{product.name}</h2>
            <p className='text-2xl font-bold text-primary'>₹{Number(product.price).toFixed(2)}</p>
            {isExpanded && (
              <p className='text-sm text-gray-600 flex-grow mt-2'>{product.description}</p>
            )}
            {/* Actions */}
            <div className="card-actions justify-end">
                <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm btn-outline btn-info">
                  <EditIcon className='h-4 w-4' />
                </Link>
                <button className='btn btn-sm btn-error btn-outline' onClick={handleDelete}>
                  <TrashIcon className='h-4 w-4' />
                </button>
                <button className="btn btn-outline btn-primary btn-sm" onClick={toggleDescription}>
                  {isExpanded ? 'Show Less' : 'View Details'}
                </button>
                
            </div>

        </div>
        
    </div>
  )
}
