package in.healinghands.dao;

import in.healinghands.model.HealingRequest;

import javax.transaction.Transactional;

import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author chaitanya
 *
 */
@Transactional
public interface HealingRequestDAO extends PagingAndSortingRepository<HealingRequest, Long> {
	
	
}
