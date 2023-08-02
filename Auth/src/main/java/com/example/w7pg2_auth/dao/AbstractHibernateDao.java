package com.example.w7pg2_auth.dao;

import java.io.Serializable;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractHibernateDao<T extends Serializable> {
	@Autowired
    protected SessionFactory sessionFactory;

    protected Class<T> clazz;

    protected final void setClazz(final Class<T> clazzToSet) {
        clazz = clazzToSet;
    }
    
    public T findById(final Integer id) {
        return getCurrentSession().get(clazz, id);
    }

    public List<T> findAll() {
        return getCurrentSession().createQuery( "SELECT p FROM " + clazz.getSimpleName() + " p").list();
    }

//    public T create(final T entity) {
//        getCurrentSession().saveOrUpdate(entity);
//        return entity;
//    }

    public T merge(T entity) {
        return (T) getCurrentSession().merge(entity);
    }

    public void delete(T entity) {
        getCurrentSession().delete(entity);
    }
    
    public void deleteById(Integer id) {
        final T entity = findById(id);
        delete(entity);
    }

    protected final Session getCurrentSession() {
        return sessionFactory.getCurrentSession();
    }
}
