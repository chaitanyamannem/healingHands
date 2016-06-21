package in.healinghands.dao;

import in.healinghands.model.Member;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

/**
 * @author chaitanya
 *
 */
@Transactional
public interface MemberDAO extends CrudRepository<Member, Long> {

}
