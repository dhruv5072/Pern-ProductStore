import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast';

//base url is dynamic 
const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:3000' : '';

export const useProductStore = create((set,get) => ({
    //product state and actions
    products: [],
    loading : false,
    error : null,
    currentProduct: null,

    //form state
    formData:{
        name: '',
        price: '',
        description: '',
        image: ''
    },

    setFormData: (data) => set({formData: data}),
    resetFormData: () => set({formData: {name: '', price: '', description: '', image: ''}}),

    addProduct: async (e) => {
        e.preventDefault();
        set({loading: true, error: null})
        try {
            const {formData} = get();
            await axios.post(`${BASE_URL}/api/products`, formData);
            await get().fetchProducts();
            get().resetFormData();
            toast.success("Product added successfully.")
            document.getElementById("add_product_modal").close();

        }
        catch (error) {
            if(error.response?.status === 429) set({error: "Too many requests. Please try again later."})
            else set({error: error.message || "An error occurred while adding the product."})
            toast.error("Failed to add product. Please try again.")
        }
        finally {
            set({loading: false})
        }
    },

    fetchProducts: async () => {
        set({loading: true, error: null})
        try {
            const response = await axios.get(`${BASE_URL}/api/products`)
            set({products: response.data.data,error: null})
        }
        catch (error) {
            if(error.response?.status === 429) set({error: "Too many requests. Please try again later." , products: []})
            else set({error: error.message || "An error occurred while fetching products." , products: [] })
        }
        finally {
            set({loading: false})
        }
    },

    deleteProduct: async (id) => {
        set({loading: true, error: null});
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`)
            set(prev => ({
                products: prev.products.filter(product => product.id !== id)
            }));
            toast.success("Product deleted successfully.");
        } catch (error) {
            console.log("Error occured",error);
            toast.error("Failed to delete the product. Please try again.");
        }
        finally {
            set({loading: false});
        }
    },

    fetchProduct: async(id) => {
        set({loading: true})
        try{
            const response = await axios.get(`${BASE_URL}/api/products/${id}`);
            const product = response.data.data[0];
            set({currentProduct : product, error: null});
            get().setFormData(product); // prefill form with current data
        }
        catch(error){
            console.log("Error in fetching function" , error);
            set({error: error.message || "An error occurred while fetching the product."});
            toast.error("Something went wrong");
        }
        finally{
            set({loading: false});
        }
    },

    updateProduct: async (id) => {
        set({loading: true});
        try {
            const {formData} = get();
            const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
            set({currentProduct: response.data.data[0]});
            toast.success("Product updated successfully.");
        } catch (error) {
            toast.error("Failed to update the product. Please try again.");
            console.log("Error in updating function" , error);
        } finally {
            set({loading: false});
        }
    },
}))
