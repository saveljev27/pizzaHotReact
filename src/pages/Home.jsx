import React from 'react'
import qs from 'qs'

import { useEffect, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'
import { sortList } from '../components/Sort'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import MyLoader from '../components/PizzaBlock/MyLoader'
import Pagination from '../components/Pagination'
import SearchContext from '../context/SearchContext'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  )

  const { items, status } = useSelector((state) => state.pizzaSlice)

  const { searchValue } = useContext(SearchContext)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `&category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    const limit = '&limit=8'

    dispatch(
      fetchPizzas({ sortBy, order, category, search, limit, currentPage })
    )

    window.scrollTo(0, 0)
  }

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      console.log(queryString)
      navigate(`/?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  useEffect(() => {
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      )
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    getPizzas()

    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const skeletons = [...new Array(8)].map((_, index) => (
    <MyLoader key={index} />
  ))
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__items">
          <h2>Произошла Ошибка!</h2>
          <p>
            Пиццы еще не приготовились <icon>😕</icon>
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
