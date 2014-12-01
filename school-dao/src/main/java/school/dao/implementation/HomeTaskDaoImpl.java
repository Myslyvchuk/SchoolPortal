package school.dao.implementation;

import java.util.List;

import javax.persistence.NoResultException;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import school.dao.HomeTaskDao;
import school.model.HomeTask;

@Repository
public class HomeTaskDaoImpl extends BaseDaoImpl<HomeTask, Long> implements
		HomeTaskDao {

	public HomeTaskDaoImpl() {
		super(HomeTask.class);
	}

	@Transactional
	public HomeTask findBySchedule(long scheduleId) {
		try {
			return (HomeTask) entityManager
					.createNamedQuery(HomeTask.FIND_BY_SCHEDULE)
					.setParameter("scheduleId", scheduleId).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Transactional
	@SuppressWarnings("unchecked")
	public List<HomeTask> findByGroup(long groupId) {
		try {
			return entityManager.createNamedQuery(HomeTask.FIND_BY_GROUP)
					.setParameter("groupId", groupId).getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Transactional
	public HomeTask findByGroupAndSchedule(long groupId, long scheduleId) {
		try {
			return (HomeTask) entityManager
					.createNamedQuery(HomeTask.FIND_BY_GROUP_SCHEDULE)
					.setParameter("groupId", groupId)
					.setParameter("scheduleId", scheduleId).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}
}