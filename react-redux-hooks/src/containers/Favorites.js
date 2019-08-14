import React, { useContext } from 'react'

// Component
import FavoriteItem from '../components/Favorites/FavoriteItem'

// Context Api
import { ProductsContext } from '../context/products-context'

// Styling
import './Products.css'

import { useStore } from '../hook-store/store'

const Favorites = props => {
  const [state, dispatch] = useStore()
  const favoriteProducts = state.products.filter(p => p.isFavorite)

  // const favoriteProducts = useContext(ProductsContext).products.filter(
  //   p => p.isFavorite,
  // )

  let content = <p className="placeholder">Got no favorites yet!</p>
  if (favoriteProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favoriteProducts.map(prod => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    )
  }
  return content
}

export default Favorites
