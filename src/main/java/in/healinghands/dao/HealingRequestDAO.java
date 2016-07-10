package in.healinghands.dao;

import javax.transaction.Transactional;

import in.healinghands.model.HealingRequest;

import org.springframework.data.repository.CrudRepository;

/**
 * @author chaitanya
 *
 */
@Transactional
public interface HealingRequestDAO extends CrudRepository<HealingRequest, Long> {
	
	
}
