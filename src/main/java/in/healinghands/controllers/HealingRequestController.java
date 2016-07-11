package in.healinghands.controllers;

import in.healinghands.HealingHandsApplication;
import in.healinghands.dao.AuthenticationDAO;
import in.healinghands.dao.HealingRequestDAO;
import in.healinghands.dao.MemberDAO;
import in.healinghands.form.HealingRequestForm;
import in.healinghands.model.HealingRequest;
import in.healinghands.model.Member;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author chaitanya
 *
 */
@Controller
public class HealingRequestController {
	
	
	
	@RequestMapping(value = "/healingRequest", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> healingRequest(@javax.validation.Valid @ModelAttribute("providerAccountForm")
	HealingRequestForm healingRequestForm, BindingResult result) {
		Map<String, Object> model = new HashMap<String, Object>();
		healingRequestForm.validate(healingRequestForm, result);
		if(result.hasErrors()){
			model.put("error", result.getFieldErrors());
			return model;
		}

		Member member = HealingHandsApplication.getMember();

		if (member == null) {
			model.put("error", "member is null");
			return model;
		}
		
		HealingRequest healingRequest = new HealingRequest(
				healingRequestForm.getTitle(),
				healingRequestForm.getDescription(),
				healingRequestForm.isEmergency(),
				healingRequestForm.isUnderMedication(),
				healingRequestForm.getMedicationDetails(), member);
		healingRequestDAO.save(healingRequest);
		
		model.put("id", healingRequest.getId());
		
		return model;
	}
	
	@RequestMapping("/healingRequests")
	@ResponseBody
	public Map<String, Object> healingRequests(int pageNumber, int pageSize) {
		Map<String, Object> model = new HashMap<String, Object>();
		Pageable pageable = new PageRequest(pageNumber, pageSize);
		Page<HealingRequest> page = healingRequestDAO.findAll(pageable);
		model.put("healingRequests", page.getContent());
		return model;
	}
	
	

	
	@Autowired
	private AuthenticationDAO authDAO;
	@Autowired
	private MemberDAO memberDAO;
	@Autowired
	private HealingRequestDAO healingRequestDAO;

}
