package school.dao.sessionfactory.implementation;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import school.dao.JournalDao;
import school.model.Journal;

public class JournalDaoImpl extends BaseDaoImpl<Journal> implements JournalDao {

	private List<Journal> journals;
	private Session session;
	private Transaction transaction;

	public JournalDaoImpl() {
		super(Journal.class);
	}

	@SuppressWarnings("unchecked")
	public List<Journal> findByInterval(Date from, Date till) {
		try {
			session = HibernateSessionFactory.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			journals = (List<Journal>) session
					.createQuery(Journal.FIND_BY_INTERVAL_QUERY)
					.setParameter("from", from).setParameter("till", till)
					.list();
			transaction.commit();
		} finally {
			if ((session != null) && (session.isOpen())) {
				session.close();
			}
		}
		return new ArrayList<Journal>(journals);
	}

	@SuppressWarnings("unchecked")
	public List<Journal> findByStudentId(long studentId) {
		try {
			session = HibernateSessionFactory.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			journals = (List<Journal>) session
					.createQuery(Journal.FIND_BY_STUDENT_QUERY)
					.setParameter("studentId", studentId).list();
			transaction.commit();
		} finally {
			if ((session != null) && (session.isOpen())) {
				session.close();
			}
		}
		return new ArrayList<Journal>(journals);
	}

	@SuppressWarnings("unchecked")
	public List<Journal> findByIntervalAndStudentId(long studentId, Date from,
			Date till) {
		try {
			session = HibernateSessionFactory.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			journals = (List<Journal>) session
					.createQuery(Journal.FIND_BY_INTERVAL_AND_STUDENT_QUERY)
					.setParameter("studentId", studentId)
					.setParameter("from", from).setParameter("till", till)
					.list();
			transaction.commit();
		} finally {
			if ((session != null) && (session.isOpen())) {
				session.close();
			}
		}
		return new ArrayList<Journal>(journals);
	}
}
