package in.healinghands.dao;

import in.healinghands.model.Authentication;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

/**
 * @author chaitanya
 *
 */
@Transactional
public interface AuthenticationDAO extends CrudRepository<Authentication, Long>  {
	
	/**
	   * This method will find an User instance in the database by its email.
	   * Note that this method is not implemented and its working code will be
	   * automagically generated from its signature by Spring Data JPA.
	   */
	public Authentication findByEmail(String email);
	
	public Authentication findByAuthToken(String authToken);
}
