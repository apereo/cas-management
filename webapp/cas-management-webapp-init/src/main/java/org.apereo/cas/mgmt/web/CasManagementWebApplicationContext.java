package org.apereo.cas.mgmt.web;

import org.apereo.cas.CasEmbeddedValueResolver;

import lombok.ToString;
import lombok.val;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext;
import org.springframework.scheduling.annotation.ScheduledAnnotationBeanPostProcessor;
import org.springframework.scheduling.config.TaskManagementConfigUtils;

/**
 * This is {@link CasManagementWebApplicationContext}.
 *
 * @author Misagh Moayyed
 * @since 5.1.0
 */
@ToString
public class CasManagementWebApplicationContext extends AnnotationConfigServletWebServerApplicationContext {


    /**
     * {@inheritDoc}
     * Reset the value resolver on the inner {@link ScheduledAnnotationBeanPostProcessor}
     * so that we can parse durations. This is due to how {@link org.springframework.scheduling.annotation.SchedulingConfiguration}
     * creates the processor and does not provide a way for one to inject a value resolver.
     */
    @Override
    protected void onRefresh() {
        val sch =
            (ScheduledAnnotationBeanPostProcessor) getBeanFactory()
                .getBean(TaskManagementConfigUtils.SCHEDULED_ANNOTATION_PROCESSOR_BEAN_NAME, BeanPostProcessor.class);
        sch.setEmbeddedValueResolver(new CasEmbeddedValueResolver(this));
        super.onRefresh();
    }
}
